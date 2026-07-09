import win32evtlog

print("=" * 60)
print("WINDOWS EVT API")
print("=" * 60)

print()

print(hasattr(win32evtlog, "EvtQuery"))
print(hasattr(win32evtlog, "EvtNext"))
print(hasattr(win32evtlog, "EvtRender"))