---
title: "Handwriting Recognition Web App"
weight: 2
draft: false
description: ""
tags: [  "Flask",
  "TensorFlow",
  "OCR",
  "Handwriting Recognition",
  "Computer Vision",
  "CRNN",
  "CTC Loss",
  "Web App",
  "Image Processing",
  "Deep Learning"]

---
## Overview
{{< lead >}}

An end-to-end handwriting recognition system with a dynamic Javascript-based front-end and a classification model backend using Flask that takes in handwritten images and converts it to text. 

{{< /lead >}}

## Model Architecture
The model is a CRNN (Convolutional Recurrent Neural Network) trained with CTC (Connectionist Temporal Classification) loss, allowing it to recognize sequences of characters from variable-length handwritten inputs without needing explicit alignment between input and labels.

## End-to-End Pipeline
- Image Upload: Users upload handwritten word images through a front-end interface.
- Preprocessing: Each image is converted to grayscale, resized, normalized, and reshaped for model input.
- Model Prediction: The backend uses a trained Keras model to predict text from images.
- Decoding: Predictions are decoded using ctc_decode and mapped back to characters for final output.

## Tech Stack
- Backend: Flask (Python)
- Frontend: HTML + JavaScript (served with Flask)
- Model: TensorFlow/Keras (CRNN with CTC Loss)
- Image Handling: OpenCV and NumPy
- Deployment: Local server (future plans to deploy online)