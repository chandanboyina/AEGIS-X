from collectors.collector_manager import CollectorManager

from collectors.windows_collector import WindowsCollector

from collectors.parsers.windows_parser import WindowsParser


manager = CollectorManager()

manager.register(

    "windows",

    WindowsCollector(

        live=True,

        log_types=[

            "Application",

            "System",

            "Security"

        ]

    ),

    WindowsParser()

)



result = manager.collect()

print()

print("===== EVENTS =====")

for event in result["events"]:

    print(event)

print()

print("===== METRICS =====")

print(result["metrics"])