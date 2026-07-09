from collectors.windows.windows_pipeline import WindowsPipeline
from agents.ueba.user_profiler import UserProfiler

pipeline = WindowsPipeline()

windows = pipeline.run()

profiler = UserProfiler()

#
# Learn from PowerShell
#

for event in windows["powershell"][:20]:

    profiler.update(event)

#
# Learn from DNS
#

for event in windows["dns"][:20]:

    profiler.update(event)

#
# Learn from Security
#

for event in windows["security"][:20]:

    profiler.update(event)

#
# Print profile
#

print(

    profiler.db.get_user("unknown")

)

print()

print(

    profiler.db.get_user("hp")

)