import numpy as np
import pickle
import json
from keras.utils import pad_sequences

from keras.models import load_model

def generate_text(seed_text,next_words,max_sequence_len):
    for _ in range(next_words):
        sequence = __tokenizer.texts_to_sequences([seed_text])
    
        padded = pad_sequences(sequence, maxlen=max_sequence_len-1)
        # print(padded)
        predicted_probabilities = __model.predict(padded, verbose=0)
        # print(predicted_probabilities)
        predicted_class = np.argmax(predicted_probabilities, axis=-1)
        output_word = ''
        for word, index in __tokenizer.word_index.items():
            if index == predicted_class:
                output_word = word
                break
        seed_text += ' ' + output_word
    return seed_text


def load_saved_artifacts():
    global __model
    global __tokenizer
    with open('d:/Project/Test generation/server/tokenizer.pkl',"rb") as fileobj:
        __tokenizer = pickle.load(fileobj)
    __model = load_model('d:/Project/Test generation/server/lstm_model.h5')

# if __name__ == "__main__":
#     load_saved_artifacts()
#     print(generate_text("Let me love you",20,19))