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
🚀 Getting Started  

1. Control Mission (Problem 1)
To test the ROV maneuverability:

Navigate to problem-1-control/.

Open index.html in any modern web browser.

Controls: Use the UI buttons or the virtual joystick to test Differential Steering (Tank Drive).

2. Telemetry Dashboard (Problem 2)
To run the live data monitoring system:

Backend: ```bash cd problem-2-telemetry/backend node server.js

Frontend: Open problem-2-telemetry/frontend/index.html in your browser. The dashboard polls the server every 5 seconds to update sensor readings and the depth chart.

3. AI Waste Detection (Problem 3)
Detailed analysis, training results, and marine environmental considerations are documented in problem-3-ml/report.md.

Detection samples can be found in the /outputs directory.

🛠 Technical Highlights
Differential Steering: Implemented axis mixing for smooth tank-drive navigation.

Native Node.js API: Developed a zero-dependency server using core http and url modules, featuring a FIFO in-memory buffer for telemetry history.

High-Contrast Dashboard: A custom-styled dark-mode interface optimized for low-light ROV control rooms.

Robust ML Pipeline: Trained a custom model to detect bottle, polythene, and styrofoam in high-turbidity underwater environments.

👨‍💻 Submission Details
Developer: [Your Name]

Repository: https://github.com/Fuad1711/Aqua_Recruitment.git

Frameworks used: Node.js, Chart.js, Ultralytics (YOLO), Roboflow.
