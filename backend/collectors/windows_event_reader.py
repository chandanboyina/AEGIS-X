import win32evtlog


class WindowsEventReader:

    """
    Reads Windows Event Viewer.
    """

    def read(
        self,
        log_type="Security",
        limit=100
    ):

        server = "localhost"

        handle = win32evtlog.OpenEventLog(

            server,

            log_type

        )

        flags = (

            win32evtlog.EVENTLOG_BACKWARDS_READ |

            win32evtlog.EVENTLOG_SEQUENTIAL_READ

        )

        events = []

        while len(events) < limit:

            records = win32evtlog.ReadEventLog(

                handle,

                flags,

                0

            )

            if not records:

                break

            for record in records:

                events.append(record)

                if len(events) >= limit:

                    break

        win32evtlog.CloseEventLog(handle)

        return events