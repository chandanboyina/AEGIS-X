import win32evtlog
import win32evtlogutil
import xml.etree.ElementTree as ET


class SecurityEventReader:
    """
    Reads Windows Security Event Log.
    """

    LOG_NAME = "Security"

    def read(self, max_events=200):

        events = []

        try:

            query = "*"

            handle = win32evtlog.EvtQuery(

                self.LOG_NAME,

                win32evtlog.EvtQueryReverseDirection,

                query

            )

        except Exception:

            return []

        while len(events) < max_events:

            records = win32evtlog.EvtNext(handle, 20)

            if not records:

                break

            for record in records:

                if len(events) >= max_events:

                    break

                try:

                    xml = win32evtlog.EvtRender(

                        record,

                        win32evtlog.EvtRenderEventXml

                    )

                    root = ET.fromstring(xml)

                    ns = {

                        "e": "http://schemas.microsoft.com/win/2004/08/events/event"

                    }

                    system = root.find("e:System", ns)

                    eventdata = root.find("e:EventData", ns)

                    event_id = int(

                        system.find("e:EventID", ns).text

                    )

                    timestamp = system.find(

                        "e:TimeCreated",

                        ns

                    ).attrib["SystemTime"]

                    computer = system.find(

                        "e:Computer",

                        ns

                    ).text

                    data = {}

                    if eventdata is not None:

                        for d in eventdata:

                            name = d.attrib.get(

                                "Name",

                                "Unknown"

                            )

                            data[name] = d.text

                    events.append(

                        {

                            "timestamp": timestamp,

                            "collector": "Windows Security",

                            "source": "Microsoft-Windows-Security-Auditing",

                            "computer": computer,

                            "event": "Windows Security",

                            "event_id": event_id,

                            "severity": "INFO",

                            "asset": computer,

                            "user": data.get("TargetUserName"),

                            "source_ip": data.get("IpAddress"),

                            "destination_ip": None,

                            "event_data": data

                        }

                    )

                except Exception:

                    continue

        return events