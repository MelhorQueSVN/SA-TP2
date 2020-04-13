# Imports
from sklearn.metrics import mean_squared_error, median_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from pandas.plotting import scatter_matrix
from tensorflow.keras.layers import Layer
from tensorflow.keras import Model
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import plotly.express as px
import tensorflow as tf
import seaborn as sns
import pandas as pd
import numpy as np
import logging
import os

# Versão do Tensorflow
print('TF version: ', tf.__version__)
print(tf.executing_eagerly())
logging.getLogger('tensorflow').setLevel(logging.ERROR)
tf.random.set_seed(666)
tf.keras.backend.clear_session()

# Carregar o dataframe
dfBraga = pd.read_csv("Braga.csv")

# Analisar o conjunto de dados
dfBraga.head

# Labels = ['date', 'maxtempC', 'mintempC', 'avgtempC', 'uvIndex', 'humidity', 'pressure', 'FeelsLikeC', 'month', 'city']
dfLabels = dfBraga.columns

# Análise e tratamento dos dados --------------------------------------------#
s = pd.isnull(dfBraga) # Não temos valores nulos

# Correlação dos dados
def correlacao(df):
    corrMatrix = df.corr()
    sns.heatmap(corrMatrix, annot=True)
    plt.savefig('result.png', bbox_inches='tight', pad_inches=0.0)
    plt.show()

# Retirar colunas não importantes
# A cidade não muda, por isso pode ser retirada
# Tabela com a variação dos dados ao longo do ano (meses)
dfMeses = dfBraga[['date', 'maxtempC', 'mintempC', 'avgtempC', 'uvIndex', 'humidity', 'pressure', 'FeelsLikeC']]
dfMeses = dfMeses.set_index(['date'])
dfMeses

dfMeses.shape

# scatter_matrix(dfMeses)
#dfMeses.plot(kind='box', subplots=True, layout=(2,7), sharex=False, sharey=False)
# plt.savefig('scatter_matrix.png', bbox_inches='tight', pad_inches=0.0)
# plt.show()

# Valores mais altos  | Valores mais baixos| Valores médios             |
# maxtempC        40  | maxtempC        0  | maxtempC        19.958539  |
# mintempC        26  | mintempC       -4  | mintempC        11.062192  |
# avgtempC        32  | avgtempC        0  | avgtempC        15.673248  |
# uvIndex          8  | uvIndex         1  | uvIndex          4.282330  |
# humidity        99  | humidity       22  | humidity        69.255676  |
# pressure      1038  | pressure      983  | pressure      1018.822310  |
# FeelsLikeC      33  | FeelsLikeC      2  | FeelsLikeC      14.846002  |

# Função usada para criar os gráficos para o relatório
# def plot(dfMeses):
#     plt.figure(figsize = (20, 15))
#     plt.hist(dfMeses['FeelsLikeC'], bins=40)
#     plt.ylabel("Ocorrências")
#     plt.xlabel("Pressão")
#     plt.axvline(dfMeses['FeelsLikeC'].mean(), color='k', linestyle='dashed', linewidth=1)
#     plt.savefig('FeelsLikeC.png', bbox_inches='tight', pad_inches=0.0)
#     plt.show()

# fig = go.Figure()
# fig = px.line(dfMeses, x=dfMeses.index, y='uvIndex')
# fig = px.line(dfMeses, x=dfMeses.index, y='avgtempC')
# fig.show()

# plt.scatter(dfMeses['FeelsLikeC'], dfBraga['month'])
# plt.axvline(dfMeses['FeelsLikeC'].mean(), color='k', linestyle='dashed', linewidth=1)
# plt.savefig('TemperaturaMedia.png', bbox_inches='tight', pad_inches=0.0)
# plt.show()

# menor = 0
# maior = 0
# igual = 0
# for x in dfBraga['FeelsLikeC']:
#     if x > dfBraga['FeelsLikeC'].mean():
#         maior += 1
#     elif x == dfBraga['FeelsLikeC'].mean():
#         igual += 1
#     else:
#         menor += 1

# mediaMaior = maior / 1013
# mediaMenor = menor / 1013
# print("Maior: " + str(maior) + " -> Equivale a " + str(round(mediaMaior * 100, 2)) + "% da media.")
# print("Menor: " + str(menor) + " -> Equivale a " + str(round(mediaMenor * 100, 2)) + "% da media.")
# print("Igual: ", igual)

# Depois de retirar as colunas desnecessárias, é preciso normalizar o conjunto de dados
# Como se trata de uma LSTM, é necessário normalizar entre -1 e 1
def normalizeDataset(df, normalizingRange = (-1, 1)):
    scaler = MinMaxScaler(feature_range = normalizingRange)
    df[["uvIndex"]] = scaler.fit_transform(df[["uvIndex"]])
    # df[["maxtempC"]] = scaler.fit_transform(df[["maxtempC"]])
    # df[["mintempC"]] = scaler.fit_transform(df[["mintempC"]])
    # df[["avgtempC"]] = scaler.fit_transform(df[["avgtempC"]])
    # df[["humidity"]] = scaler.fit_transform(df[["humidity"]])
    # df[["pressure"]] = scaler.fit_transform(df[["pressure"]])
    # df[["FeelsLikeC"]] = scaler.fit_transform(df[["FeelsLikeC"]])
    return scaler

# ---------------------------------------------------------------------------#

# Criar o problema supervisionado
def supervised(df, timesteps):
    data = df.values
    X, y = list(), list()
    # Tamanho do dataset
    size = len(data)

    for i in range(size):
        inputIndex = i + timesteps
        labelIndex = inputIndex + 1

        if(labelIndex < size):
            X.append(data[i:inputIndex, :])
            y.append(data[inputIndex:labelIndex, 0])
    return np.array(X).astype("float32"), np.array(y).astype("float32")

# Dividir o conjunto de dados em conjuntos de treino e de validação
def splitDataset(training, perc = 10):
    train = np.arange(0, int(len(training) * (100 - perc) / 100))
    valid = np.arange(int(len(training) * (100 - perc) / 100 + 1), len(training))
    return train, valid

def checker(yReal, yPrev):
    check = tf.keras.backend.sqrt(tf.keras.backend.mean(tf.keras.backend.square(yPrev - yReal)))
    return check

# Criar o modelo
def buildModel(timesteps, features, neurons = 64, activation = 'tanh', dropoutRate = 0.5):
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.LSTM(neurons, return_sequences = True, input_shape = (timesteps, features)))
    model.add(tf.keras.layers.LSTM(int(neurons ^ 2), return_sequences = True, dropout = dropoutRate))
    model.add(tf.keras.layers.LSTM(int(neurons * 4), return_sequences =  False, dropout = dropoutRate))
    model.add(tf.keras.layers.Dense(neurons, activation = activation))
    model.add(tf.keras.layers.Dropout(dropoutRate))
    model.add(tf.keras.layers.Dense(1, activation = "linear"))

    # Compilar o modelo
    model.compile(loss = checker, optimizer = tf.keras.optimizers.Adam(), metrics = ["mae", checker])

    print(model.summary())
    tf.keras.utils.plot_model(model, "model.png", show_shapes = True)
    return model

# ---------------------------------------------------------------------------#

# Funções para representar graficamente os dados # alterar para o trabalho
def plot(data):
    plt.figure(figsize = (15, 10))
    plt.plot(range(len(data['uvIndex'])), data['uvIndex'])
    plt.ylabel("Índice de UV")
    plt.xlabel("Dia")
    plt.show()

def plotPredict(data, predictions):
    plt.figure(figsize=(8,6))
    plt.plot(range(len(data['uvIndex'])), data['uvIndex'], color="green", label="Confirmados")
    plt.plot(range(len(data['uvIndex']) - 1, len(data['uvIndex']) + len(predictions) - 1), predictions, color="red", label="Previstos")
    plt.ylabel("Índice de UV previsto")
    plt.xlabel("Dia")
    plt.show()

# ---------------------------------------------------------------------------#

# Variáveis
# Timesteps - número de steps por sequência
# Univariate - número de features usadas pelo modelo
# Multisteps - número de dias para os quais se vai fazer uma previsão (unistep se for 1 a 1)
timesteps = 5
univariate = 1
multisteps = 7
epochs = 50
batchSize = 6
verbose = 1

dfMeses = dfMeses[['maxtempC', 'mintempC', 'avgtempC', 'humidity', 'pressure', 'FeelsLikeC', 'uvIndex']]
d = dfMeses[['uvIndex']]
df = d.copy()
scaler = normalizeDataset(df)
X, y = supervised(df, timesteps)

# correlacao(df)

# Experimentar o modelo
lr = tf.keras.callbacks.ReduceLROnPlateau(monitor = "val_loss", factor = 0.2, patience = 50, min_ir = 0.00005)

# Fazer fit do melhor modelo com todos os dados 
model = buildModel(timesteps, univariate)
model.fit(X, y, epochs = epochs, batch_size = batchSize, shuffle = False, verbose = verbose, callbacks = [lr])

# Fazer as previsões
def predict(model, df, timesteps, multisteps, scaler):
    # Obter a última sequência de valores conhecidos do conjunto de dados
    inputSequence = df[-timesteps:].values
    input = inputSequence
    predictionList = list()

    for dia in range(1, multisteps + 1):
        input = input.reshape(1, timesteps, 1)
        yhat = model.predict(input, verbose = verbose)
        yhatInverse = scaler.inverse_transform(yhat)
        predictionList.append(yhatInverse[0][0])
        input = np.append(input[0], yhat)
        input = input[-timesteps:]
    return predictionList

# Fazer a previsão
predictions = predict(model, df, timesteps, multisteps, scaler)
print(predictions)

# Representar os valores reais e previstos
plot(dfMeses)
#plot(predictions)
plotPredict(dfMeses, predictions)
