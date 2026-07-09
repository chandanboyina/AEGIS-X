from collectors.windows.windows_pipeline import WindowsPipeline

from agents.ueba.user_profiler import UserProfiler
from agents.ueba.host_profiler import HostProfiler
from agents.ueba.process_profiler import ProcessProfiler

from agents.ueba.behavior_baseline import BehaviorBaseline


pipeline = WindowsPipeline()

windows = pipeline.run()

user = UserProfiler()

host = HostProfiler()

process = ProcessProfiler()

#
# Learn
#

for collector in windows.values():

    for event in collector:

        user.update(event)

        host.update(event)

        process.update(event)

#
# Pick one event
#

event = windows["powershell"][0]

baseline = BehaviorBaseline().build(event)

print("=" * 60)

print("ENTERPRISE BASELINE")

print("=" * 60)

print()

for k, v in baseline.items():

    print(k)

    print(v)

    print("-" * 60)