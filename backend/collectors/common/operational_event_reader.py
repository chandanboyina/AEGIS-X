import win32evtlog
import xml.etree.ElementTree as ET


class OperationalEventReader:
    """
    Enterprise Windows Operational Event Reader.

    Supports:

        • Sysmon
        • Defender
        • PowerShell
        • DNS
        • Terminal Services
        • Any Operational Channel
    """

    def __init__(

        self,

        channel

    ):

        self.channel = channel

    def read(

        self,

        max_events=200

    ):

        events = []

        try:

            handle = win32evtlog.EvtQuery(

                self.channel,

                win32evtlog.EvtQueryReverseDirection

            )

        except Exception:

            return []

        while len(events) < max_events:

            records = win32evtlog.EvtNext(

                handle,

                20

            )

            if not records:

                break

            for record in records:

                xml = win32evtlog.EvtRender(

                    record,

                    win32evtlog.EvtRenderEventXml

                )

                event = self.parse_xml(xml)

                events.append(event)

                if len(events) >= max_events:

                    break

        return events

    def parse_xml(

        self,

        xml

    ):

        root = ET.fromstring(xml)

        ns = {

            "e":

            "http://schemas.microsoft.com/win/2004/08/events/event"

        }

        #
        # System
        #

        system = root.find(

            "e:System",

            ns

        )

        provider = system.find(

            "e:Provider",

            ns

        )

        event_id = system.find(

            "e:EventID",

            ns

        )

        timestamp = system.find(

            "e:TimeCreated",

            ns

        )

        computer = system.find(

            "e:Computer",

            ns

        )

        #
        # EventData
        #

        event_data = {}

        data = root.find(

            "e:EventData",

            ns

        )

        if data is not None:

            for item in data:

                name = item.attrib.get(

                    "Name",

                    "Value"

                )

                event_data[name] = item.text

        return {

            "timestamp":

                timestamp.attrib.get(

                    "SystemTime"

                ),

            "collector":

                self.channel,

            "source":

                provider.attrib.get(

                    "Name"

                ),

            "computer":

                computer.text

                if computer is not None

                else "localhost",

            "event":

                provider.attrib.get(

                    "Name"

                ),

            "event_id":

                int(event_id.text),

            "severity":

                "INFO",

            "asset":

                "localhost",

            "user":

                None,

            "source_ip":

                None,

            "destination_ip":

                None,

            "event_data":

                event_data

        }