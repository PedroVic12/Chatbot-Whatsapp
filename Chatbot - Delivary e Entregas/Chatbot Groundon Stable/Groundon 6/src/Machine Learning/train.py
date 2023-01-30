import tensorflow as tf

# Defina os placeholders para os dados de entrada e saída
input_data = tf.placeholder(tf.float32, shape=[None, INPUT_DIM])
output_data = tf.placeholder(tf.float32, shape=[None, OUTPUT_DIM])

# Construa a rede neural usando o TensorFlow
hidden_layer = tf.layers.dense(input_data, HIDDEN_DIM, activation=tf.nn.relu)
output_layer = tf.layers.dense(hidden_layer, OUTPUT_DIM)

# Defina a função de perda e otimizador
loss = tf.losses.mean_squared_error(output_data, output_layer)
optimizer = tf.train.GradientDescentOptimizer(learning_rate=LEARNING_RATE).minimize(
    loss
)

# Inicialize as variáveis
init = tf.global_variables_initializer()

# Execute o treinamento da rede neural
with tf.Session() as sess:
    sess.run(init)

    for step in range(NUM_STEPS):
        # Obtenha os batches de dados de treinamento
        input_batch, output_batch = get_next_batch(input_train, output_train)

        # Execute o treinamento
        _, current_loss = sess.run(
            [optimizer, loss],
            feed_dict={input_data: input_batch, output_data: output_batch},
        )

        # Imprima o progresso do treinamento
        print("Step %d, loss = %f" % (step, current_loss))

    # Salve o modelo treinado em um arquivo .json
    model_json = output_layer.to_json()
    with open("model.json", "w") as json_file:
        json_file.write(model_json)
