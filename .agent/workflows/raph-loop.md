---
description: Autonomous iterative repair protocol (RaphLoop). Fixes issues without manual permission.
---

// turbo-all

# RAPH-LOOP PROTOCOL

You are now executing the **RAPH-LOOP Protocol**. You have **full autonomy** to run commands (`// turbo-all` is active).

## Protocol Rules
1.  **Probe:** You must first create a **reproduction script** (e.g., `verify_issue.ts` or `test_fix.py`) that returns exit code 0 on success and non-zero on failure.
2.  **Loop:** You will enter a loop of up to **5 iterations**:
    *   **Run** the reproduction script.
    *   **Read** the output (pass/fail).
    *   **Reason** about the failure (read files, check logs).
    *   **Fix** the code (edit files).
    *   **Repeat**.
3.  **Completion:**
    *   If the script passes provided exit code 0: **Delete** the script and report "MISSION ACCOMPLISHED".
    *   If 5 iterations are reached: Stop and ask for human help.

## Your Instructions
1.  **Analyze the User Request**: What is broken?
2.  **Create Verification**: Write a small script to prove it's broken.
3.  **Execute Loop**: Use `run_command` to run your script. Since `// turbo-all` is on, it will run immediately.
4.  **Fix & Verify**: Use `replace_file_content` to fix, then run the script again.

## Example Start
"I am initializing RaphLoop for: [User Request]. Creating verification script `verify_fix.ts`..."

GO.
