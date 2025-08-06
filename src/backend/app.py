import json
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

PROCESSED_DATA_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'processed', 'BrentOilPrices.csv')
MODEL_RESULTS_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'processed', 'model_results.json')

try:
    oil_data_df = pd.read_csv(PROCESSED_DATA_PATH, index_col='Date', parse_dates=True)
    print("Successfully loaded Brent Oil price data.")
except FileNotFoundError:
    print(f"Error: Processed data file not found at {PROCESSED_DATA_PATH}")
    oil_data_df = pd.DataFrame()

try:
    with open(MODEL_RESULTS_PATH, 'r') as f:
        model_results_dict = json.load(f)
    print("Successfully loaded model results.")
except FileNotFoundError:
    print(f"Error: Model results file not found at {MODEL_RESULTS_PATH}")
    model_results_dict = {}

@app.route('/api/price_data', methods=['GET'])
def get_price_data():
    if oil_data_df.empty:
        return jsonify({"error": "Data not available"}), 500
    data_for_json = oil_data_df[['Price', 'Log_Returns']].reset_index()
    data_for_json['Date'] = data_for_json['Date'].dt.strftime('%Y-%m-%d')
    return jsonify(data_for_json.to_dict(orient='records'))

@app.route('/api/change_point', methods=['GET'])
def get_change_point():
    if not model_results_dict:
        return jsonify({"error": "Model results not available"}), 500
    return jsonify(model_results_dict)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
