import win32evtlog
from datetime import datetime


class SysmonEventReader:
    """
    Reads live Sysmon Operational events.
    """

    LOG_NAME = "Microsoft-Windows-Sysmon/Operational"

    def installed(self):
        """
        Returns True if the Sysmon event log exists.
        """

        try:

            win32evtlog.OpenEventLog(

                None,

                self.LOG_NAME

            )

            return True

        except Exception:

            return False

    def read(
        self,
        max_events=200
    ):
        
        # temporary
        print(">>> Reading Sysmon Log <<<")
        print(self.LOG_NAME)

        events = []

        try:

            handle = win32evtlog.OpenEventLog(

                None,

                self.LOG_NAME

            )

        # temporary
        except Exception as e:

            print("FAILED:", e)

            return []

        #except Exception:

            # Sysmon not installed
        #    return []

        flags = (

            win32evtlog.EVENTLOG_BACKWARDS_READ |

            win32evtlog.EVENTLOG_SEQUENTIAL_READ

        )

        while len(events) < max_events:

            records = win32evtlog.ReadEventLog(

                handle,

                flags,

                0

            )

            if not records:

                break

            for record in records:

                if len(events) >= max_events:

                    break

                events.append(

                    {

                        "timestamp":

                            record.TimeGenerated.Format(),

                        "collector":

                            "Sysmon",

                        "source":

                            record.SourceName,

                        "event":

                            record.SourceName,

                        "event_id":

                            record.EventID & 0xFFFF,

                        "severity":

                            "INFO",

                        "asset":

                            "localhost",

                        "user":

                            None,

                        "source_ip":

                            None,

                        "destination_ip":

                            None

                    }

                )

        win32evtlog.CloseEventLog(handle)

        return events