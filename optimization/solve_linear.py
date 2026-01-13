import csv
import math
import os

# --- Configuration ---
MAX_TREES = 200
OUTPUT_FILE = "submission.csv"

# --- Tree Geometry (Approximation) ---
# Since we don't have exact vertices, we assume a bounding circle.
# Search results say area ~ 0.25. radius = sqrt(0.25/pi) ~ 0.28.
# To be safe, let's assume a unit spacing of 1.0 (arbitrary scaling).
# In a real competition, we would parse the specific tree vertices.
TREE_SPACING = 2.0  # Safe linear spacing to avoid overlap

def simple_linear_regression_layout(n_trees):
    """
    Arranges trees in a linear line: x = w * i + b
    This is modeling the position as a linear regression of the index.
    """
    coords = []
    
    # "Train" our linear model (effectively setting the weights)
    # W = [spacing, 0]
    # b = [0, 0]
    
    W_x = TREE_SPACING
    W_y = 0.0 # Standard linear regression (line)
    
    # Optimization: To minimize the bounding box, a diagonal might be better?
    # No, for a square bbox, a diagonal x=y=i is worse (side length N*w).
    # A line x=i*w, y=0 gives side length N*w (but y is 0).
    # Since it must be a SQUARE bounding box, the score is max(width, height).
    # So a line is very bad (score = N). Ideally we want a grid (score = sqrt(N)).
    
    for i in range(n_trees):
        # Apply the linear model
        x = W_x * i
        y = W_y * i
        deg = 0.0
        
        coords.append({
            "id": f"{n_trees}_{i}",
            "x": x,
            "y": y,
            "deg": deg
        })
        
    return coords

def main():
    print("Generating Linear Regression Baseline for Santa 2025...")
    
    all_rows = []
    
    # Generate for all N from 1 to 200
    for n in range(1, MAX_TREES + 1):
        layout = simple_linear_regression_layout(n)
        all_rows.extend(layout)
        
    # Write to CSV
    # Optimization folder might not exist, using root for now or user's project structure
    # The user asked to "generate prp, ultrathibk", I will put the script in 'optimization'
    
    os.makedirs("optimization", exist_ok=True)
    filepath = os.path.join("optimization", OUTPUT_FILE)
    
    with open(filepath, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "x", "y", "deg"])
        writer.writeheader()
        writer.writerows(all_rows)
        
    print(f"Generated {len(all_rows)} rows to {filepath}")
    print("Linear Regression Baseline Complete.")

if __name__ == "__main__":
    main()
