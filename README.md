# Project Aqua: ROV Software Systems

This repository contains the full software suite for the underwater Remotely Operated Vehicle (ROV) mission, covering control logic, real-time telemetry monitoring, and AI-driven waste detection.

## 📁 Project Structure

```text
Aqua_Recruitment/
├── problem-1-control/        
│   ├── index.html            
│   ├── student-task.js       
│   └── engine.js             
├── problem-2-telemetry/      
│   ├── backend/
│   │   ├── server.js         
│   │   └── sensor_data_500.json
│   └── frontend/
│       ├── index.html        
│       ├── script.js         
│       └── style.css         
├── problem-3-ml/             
│   ├── outputs/              
│   ├── performanceGraphs/    
│   ├── roboflowDatasetLink.txt
│   └── report.md             
├── api-spec.md               
├── README.md                 
└── .gitignore
```
## 🚀 Getting Started

### 1. Control Mission (Problem 1)
To test the ROV maneuverability:
- Navigate to `problem-1-control/` and open `index.html`.
- Use the UI buttons or virtual joystick to test Tank Drive logic.

### 2. Telemetry Dashboard (Problem 2)
To run the live data monitoring system:
1. Open terminal in `problem-2-telemetry/backend` and run `node server.js`.
2. Open `problem-2-telemetry/frontend/index.html` to view the live chart and status alerts.

### 3. AI Waste Detection (Problem 3)
- Detailed analysis and training results are documented in `problem-3-ml/report.md`.

---

## 🛠 Technical Highlights

* **Differential Steering**: Implemented axis mixing ($V_{left} = Y + X$) for smooth navigation.
* **Native Node.js API**: Zero-dependency REST API featuring a FIFO in-memory buffer.
* **Dark Mode Dashboard**: Optimized high-contrast UI using CSS Grid and Chart.js.
* **AI Pipeline**: Custom YOLO model for detecting underwater plastic and styrofoam.

## 👨‍💻 Submission Details
* **Repository**: [https://github.com/Fuad1711/Aqua_Recruitment](https://github.com/Fuad1711/Aqua_Recruitment)
