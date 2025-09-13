import os
import sys

# Fix for macOS file descriptor issue
if sys.platform == "darwin":
    os.environ.setdefault("OBJC_DISABLE_INITIALIZE_FORK_SAFETY", "YES")

# Workaround for billiard close_open_fds issue on macOS
import billiard

if hasattr(billiard, "set_pdeathsig"):
    billiard.set_pdeathsig = lambda sig: None

# Additional configuration to prevent the issue
worker_max_tasks_per_child = 1000
worker_disable_rate_limits = True
beat_max_loop_interval = 300
