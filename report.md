# Project Aqua Software Recruitment - Report

## Overview
This repository contains solutions for the Aqua Software recruitment tasks:

1. **ROV Joystick Control** (Problem 1)
2. **ROV Telemetry Monitoring System** (Problem 2)
3. **Underwater Waste Detection using YOLOv26** (Problem 3)

This report summarizes the **dataset, methodology, implementation, and results** for the telemetry and ML tasks.

---

## Problem 2: ROV Telemetry Monitoring System

### Backend
- Built using **Native Node.js** (`http` and `url` modules)
- Endpoints:
  - `POST /api/telemetry` → accepts telemetry JSON payload
  - `GET /api/telemetry/latest` → returns latest entry
  - `GET /api/telemetry/history?limit=N` → returns last N entries
- **FIFO in-memory array** to store up to 100 telemetry entries
- Validates payloads and returns **400-series codes** for invalid data

### Frontend
- Lightweight dashboard using **HTML, CSS, and Vanilla JS**
- Polls `/latest` every 5 seconds
- Displays sensor values numerically:
  - Depth (m)
  - Pressure (bar)
  - Temperature (°C)
  - Direction (°)
- Displays **system status** based on pressure:
  - **NORMAL:** <1.8 bar
  - **WARNING:** 1.8–2.0 bar
  - **CRITICAL:** >2.0 bar
- **Depth vs Time chart** plotted using Chart.js
- Example screenshot: *(You can include a screenshot of the dashboard here)*

### Telemetry Simulation
- Streams data from `sensor_data_500.json` every 5 seconds
- Keeps updating “latest” telemetry for frontend visualization

---

## Problem 3: Underwater Waste Detection Using YOLOv26

## Overview
This project focuses on detecting underwater waste using a custom YOLOv26 model.  
The target classes are: **bottle, polythene, styrofoam**.

---

## Dataset
- Annotated using **Roboflow**
- Dataset split:
  - Train: 960 images
  - Validation: 92 images
  - Test: 45 images
- Annotated dataset link: see `roboflowDatasetLink.txt`

---

## Training
- **Model:** YOLOv26 (Ultralytics)  
- **Epochs:** 30  
- Observations:
  - Box loss decreased significantly
  - DFL loss converged more slowly
  - mAP metrics improved gradually  

---

## Inference
- Model tested on unseen test images  
- Annotated outputs saved in `outputs/inference/`  

Example prediction:

![Example Prediction](outputs/inference/example1.jpg)

---

## Performance Evaluation
All training performance graphs are in `results.png`:

![Training and Evaluation Results](outputs/results.png)

**Validation Metrics Summary:**

| Class      | Precision | Recall | mAP@0.5 | mAP@0.5-0.95 |
|------------|-----------|--------|---------|--------------|
| Bottle     | 0.883     | 0.920  | 0.936   | 0.804        |
| Polythene  | 0.932     | 0.895  | 0.906   | 0.851        |
| Styrofoam  | 0.970     | 0.929  | 0.966   | 0.909        |
| **All**    | 0.928     | 0.914  | 0.936   | 0.854        |

---

## Notes and Conclusion
- Model performs well on **bottles** and **styrofoam**  
- Polythene detection is slightly lower; can improve with augmentation  
- Annotated outputs and performance graphs provide clear visualization of the model's predictions and training behavior  

---

## References
- [Ultralytics YOLO Documentation](https://docs.ultralytics.com/)  
- [Roboflow](https://roboflow.com/) for dataset annotation
