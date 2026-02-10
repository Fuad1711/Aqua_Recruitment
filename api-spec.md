# ROV Telemetry API Specification

This specification defines the REST API used for the **Remotely Operated Vehicle (ROV)** telemetry monitoring system.  
The backend is built using **Native Node.js** and manages telemetry data in a **FIFO (First-In-First-Out)** in-memory buffer with a maximum capacity of 100 entries.

---

## 📍 Base URL
`http://localhost:3000`

---

## 🚀 Endpoints

### 1. Get Latest Telemetry
Retrieves the most recent sensor data point.  
Used by the dashboard for real-time updates.

- **URL:** `/api/telemetry/latest`  
- **Method:** `GET`  
- **Success Response:** `200 OK`

**Sample JSON Response:**
```json
{
  "depth": 14.2,
  "pressure": 1.75,
  "temperature": 12.4,
  "direction": 210,
  "timestamp": "14:30:05"
}
````

---

### 2. Get Telemetry History

Retrieves a list of historical records, useful for plotting trends and charts.

* **URL:** `/api/telemetry/history`
* **Method:** `GET`
* **Query Parameters:**

  * `limit` (optional) – The number of most recent records to return

**Example Request:**

```
/api/telemetry/history?limit=3
```

**Success Response:** `200 OK`

**Sample JSON Response:**

```json
[
  {
    "depth": 12.5,
    "pressure": 1.65,
    "temperature": 11.9,
    "direction": 200,
    "timestamp": "14:29:50"
  },
  {
    "depth": 13.0,
    "pressure": 1.70,
    "temperature": 12.0,
    "direction": 205,
    "timestamp": "14:29:55"
  },
  {
    "depth": 14.0,
    "pressure": 1.72,
    "temperature": 12.2,
    "direction": 210,
    "timestamp": "14:30:00"
  }
]
```

**Error Response Example:**

```json
{
  "error": "Invalid limit value"
}
```

* **Status Code:** 400 Bad Request

---

### 3. Submit New Telemetry

Receives live data from the ROV sensors and adds it to the memory buffer.

* **URL:** `/api/telemetry`
* **Method:** `POST`
* **Content-Type:** `application/json`

**Required JSON Payload:**

```json
{
  "depth": 15.0,
  "pressure": 1.85,
  "temperature": 11.9,
  "direction": 215,
  "timestamp": "14:30:10"
}
```

**Response Codes:**

| Status Code     | Description                                   |
| --------------- | --------------------------------------------- |
| 201 Created     | Data successfully stored                      |
| 400 Bad Request | Invalid data types or missing required fields |

**Sample Error Response:**

```json
{
  "error": "Invalid telemetry payload"
}
```

---

## 🛠 Data Constraints & Validation

* **Buffer Limit:** Only the last 100 entries are stored. New entries push out the oldest entries.
* **Data Types:**

  * `depth`, `pressure`, `temperature`, `direction` → **Number**
  * `timestamp` → **String**
* **Direction Constraint:** 0 ≤ `direction` ≤ 360

### Pressure Alerts

* **Normal:** < 1.8 bar
* **Warning:** 1.8 – 2.0 bar
* **Critical:** > 2.0 bar

---

## 💻 Example Usage (Frontend Fetch)

**Get Latest Telemetry:**

```javascript
fetch('http://localhost:3000/api/telemetry/latest')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error fetching telemetry:', err));
```

**Submit New Telemetry:**

```javascript
fetch('http://localhost:3000/api/telemetry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    depth: 15,
    pressure: 1.85,
    temperature: 11.9,
    direction: 215,
    timestamp: "14:30:10"
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error posting telemetry:', err));
```

**Get Telemetry History:**

```javascript
fetch('http://localhost:3000/api/telemetry/history?limit=5')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error fetching history:', err));
```

---

## Notes

* The API supports **real-time telemetry monitoring**.
* Dashboards can poll `/latest` for live updates and `/history` for plotting trends.
* Proper validation ensures only correctly formatted telemetry data is stored.
