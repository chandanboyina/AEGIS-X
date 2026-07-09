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

            "System"

        ]

    ),

    WindowsParser()

)

result = manager.collect()

print("=" * 70)
print("WINDOWS TELEMETRY PIPELINE")
print("=" * 70)

print()

print("Events :", len(result["events"]))

print()

print(result["events"][0])