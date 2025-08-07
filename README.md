# Time_Series_Analysis_Code_Change-Point-Detection
Brent Oil Price Analysis and Dashboard
This repository contains a full-stack application that performs a Bayesian change point analysis on Brent Crude Oil price data and visualizes the results in a web dashboard.

The project is structured into three main parts:

Data Analysis: Jupyter notebooks for data cleaning and building the Bayesian change point model.

Backend: A Flask API that serves the processed data and model results.

Frontend: A React application that consumes the API and displays the interactive dashboard.

Project Structure
The project follows a standard structure for data science and web development projects:

 Time_Series_Analysis_Code_Change-Point-Detection/
 
├── data/

│   ├── raw/

│   └── processed/

├── notebooks/

│   ├── 01_Data_Processing.ipynb

│   └── 02_Bayesian_Change_Point_Model.ipynb

├── src/

│   └── dashboard/

│       ├── app.py

│       ├── requirements.txt

│       └── frontend/

│           ├── public/

│           ├── src/

│           ├── package.json

│           └── package-lock.json


└── venv/


Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
You will need the following installed on your machine:

Python 3.8+

Node.js and npm

Git

1. Clone the Repository
Clone the project to your local machine using Git:

git clone https://github.com/Gemechu-G/Time_Series_Analysis_Code_Change-Point-Detection.git
cd brent-oil-analysis

Note: Replace https://github.com/Gemechu-G/Time_Series_Analysis_Code_Change-Point-Detection.git with the actual URL of your repository.

2. Set Up the Backend
The backend is a Flask API. Navigate to the src/dashboard directory, create a virtual environment, and install the required Python packages.

cd src/dashboard
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
pip install -r requirements.txt

3. Set Up the Frontend
The frontend is a React application. Navigate to the src/dashboard/frontend directory and install the Node.js dependencies.

cd frontend
npm install

4. Run the Project
You will need to run the backend and frontend in separate terminal windows.

Start the Backend
In the src/dashboard directory, run the Flask application:

python app.py

This will start the API server on http://localhost:5000.

Start the Frontend
In a new terminal window, navigate to the src/dashboard/frontend directory and start the React development server:

npm start

This will open the dashboard in your web browser at http://localhost:3000.

Analysis and Model Details
01_Data_Processing.ipynb: This notebook covers the initial data cleaning, handling of missing values, and the calculation of log returns from the raw Brent Oil price data.

02_Bayesian_Change_Point_Model.ipynb: This notebook details the implementation of a Bayesian change point model on the time series data. It identifies the most probable date where a significant shift in the data's characteristics occurred. The output of this notebook is saved to data/processed/model_results.json, which is then consumed by the Flask API.

API Endpoints
The Flask backend exposes the following API endpoints:

/api/price_data: A GET request to this endpoint returns a JSON array of the Brent Oil price data and log returns.

/api/change_point: A GET request to this endpoint returns a JSON object containing the identified change point date and its credible interval.

License
This project is licensed under the MIT License.
