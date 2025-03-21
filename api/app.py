from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-domain requests

# File to store visit counts
DATA_FILE = 'visitor_counts.json'

def load_counts():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_counts(counts):
    with open(DATA_FILE, 'w') as f:
        json.dump(counts, f)

@app.route('/api/visitors/<post_id>', methods=['GET', 'POST'])
def visitor_count(post_id):
    counts = load_counts()
    
    if post_id not in counts:
        counts[post_id] = 0
    
    if request.method == 'POST':
        counts[post_id] += 1
        save_counts(counts)
    
    return jsonify({'count': counts[post_id]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
