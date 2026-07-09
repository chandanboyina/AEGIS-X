from abc import ABC, abstractmethod


class PluginBase(ABC):
    """
    Base interface for every SOAR integration.
    """

    name = "Unknown"

    @abstractmethod
    def execute(
        self,
        action
    ):
        pass