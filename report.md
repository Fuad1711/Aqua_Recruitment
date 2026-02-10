# Problem 3: Underwater Waste Detection Report

## 1. Project Objective
The goal was to curate a dataset and train a YOLO model to identify three specific categories of underwater waste: **Plastic Bottles**, **Polythene**, and **Styrofoam**. 

## 2. Marine Environment Limitations
Training an AI for underwater use is significantly harder than surface-level detection due to:
* **Color Diminishment:** Red light is absorbed within the first 5 meters of water, making objects appear blue/green. 
* **Turbidity (Murkiness):** Suspended particles (marine snow) create visual noise that can be mistaken for small pieces of waste.
* **Refraction:** Water distorts the shape and size of objects, meaning the model needs to be robust against geometric warping.

## 3. Data Augmentation Strategy
To counter these environmental factors, the following augmentations were used in Roboflow:
* **Grayscale & Hue Adjustment:** To help the model recognize objects by shape rather than just color (which changes at depth).
* **Blur & Noise:** To simulate murky water conditions.
* **Random Crop & Rotation:** To account for waste floating at unpredictable angles or partially buried in sand.

## 4. Model Evaluation
The model was evaluated using standard Object Detection metrics:
* **mAP@0.5:** Measures the overall accuracy of the bounding boxes.
* **Confusion Matrix:** Used to identify if the model is confusing "Polythene" with "Styrofoam" due to their similar white/translucent appearance.

[Note: Performance graphs are located in the /performanceGraphs directory.]
