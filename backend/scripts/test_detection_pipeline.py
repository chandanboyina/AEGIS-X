from agents.detection.detection_engine import DetectionEngine

engine = DetectionEngine()

event = {

    "event_id":4625,

    "severity":"CRITICAL",

    "user":"Administrator",

    "ioc_list":[

        "192.168.1.5"

    ]

}

result = engine.analyze(
    event
)

print()

print("===== FEATURES =====")

print(
    result["features"]
)

print()

print("===== UEBA =====")

print(
    result["ueba"]
)