import os
import math
import csv
import random

try:
    import torch
    import torch.nn as nn
    import torch.optim as optim
except ImportError:
    print("PyTorch not found. Please install it using: pip install torch")
    exit(1)

# --- Configuration ---
MAX_TREES = 50   # Optimization: Start with smaller N for demo speed
EPOCHS = 1000
LR = 0.1
TREE_RADIUS = 0.5  # Assumed geometric radius (Area ~0.25 => r~0.28, padding to 0.5)

class PackingModel(nn.Module):
    def __init__(self, n_trees):
        super().__init__()
        # Initialize positions randomly in a larger box to start
        # Use simple Linear layer concept: Params = coordinates
        self.pos = nn.Parameter(torch.randn(n_trees, 2) * n_trees * 0.1) 
        self.n_trees = n_trees

    def forward(self):
        return self.pos

def loss_function(pos):
    # 1. Bounding Box Loss (minimize side length)
    min_xy, _ = torch.min(pos, dim=0)
    max_xy, _ = torch.max(pos, dim=0)
    
    side_lengths = max_xy - min_xy
    max_side = torch.max(side_lengths)
    
    bbox_loss = max_side ** 2 # Minimize Area (Square)
    
    # 2. Collision Loss (Penalty for overlapping)
    # Calculate pairwise distances
    # A: (N, 1, 2), B: (1, N, 2) -> (N, N, 2)
    diff = pos.unsqueeze(1) - pos.unsqueeze(0)
    dist_sq = torch.sum(diff ** 2, dim=-1) # (N, N)
    dist = torch.sqrt(dist_sq + 1e-6)
    
    # Desired distance = 2 * Radius
    min_dist = 2 * TREE_RADIUS
    
    # Overlap = max(0, min_dist - current_dist)
    # We ignore diagonal (self-self dist is 0, but min_dist is 1, so it would penalize)
    # So masking diagonal
    mask = torch.eye(pos.shape[0], device=pos.device).bool()
    
    overlap = torch.relu(min_dist - dist)
    overlap = overlap.masked_fill(mask, 0.0) # Remove self-overlap
    
    collision_loss = torch.sum(overlap ** 2)
    
    return bbox_loss + 100.0 * collision_loss, max_side.item(), collision_loss.item()

def solve_for_n(n):
    print(f"Optimizing for N={n} trees...")
    model = PackingModel(n)
    optimizer = optim.Adam(model.parameters(), lr=LR)
    
    best_loss = float('inf')
    best_pos = None
    
    for epoch in range(EPOCHS):
        optimizer.zero_grad()
        pos = model()
        loss, side, coll = loss_function(pos)
        
        loss.backward()
        optimizer.step()
        
        if epoch % 200 == 0:
            print(f"  Epoch {epoch}: Loss={loss.item():.4f}, Side={side:.4f}, Coll={coll:.4f}")
            
    return model.pos.detach().numpy()

def main():
    print("Starting Differentiable Physics Packer (Neural)...")
    
    all_rows = []
    
    # For the competition we need 1..200. 
    # This script demonstrates the 'Complex Model' logic on a subset.
    for n in range(1, MAX_TREES + 1):
        if n % 10 != 0 and n != 1 and n != MAX_TREES: continue # Skip for speed in demo
        
        final_pos = solve_for_n(n)
        
        # Center the result
        min_x, min_y = final_pos[:, 0].min(), final_pos[:, 1].min()
        
        for i, (x, y) in enumerate(final_pos):
            all_rows.append({
                "id": f"{n}_{i}",
                "x": x - min_x,
                "y": y - min_y,
                "deg": 0.0
            })

    output_file = os.path.join("optimization", "neural_submission.csv")
    os.makedirs("optimization", exist_ok=True)
    
    with open(output_file, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "x", "y", "deg"])
        writer.writeheader()
        writer.writerows(all_rows)
        
    print(f"Neural packing complete. Saved to {output_file}")
    print("Note: This model requires tuning 'EPOCHS' and 'LR' for full 200-tree convergence.")

if __name__ == "__main__":
    main()
