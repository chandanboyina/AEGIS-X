class CommanderRepository:
    """
    Stores enterprise forecasts.
    """

    forecasts = []

    @classmethod
    def add(cls, result):

        cls.forecasts.append(result)

    @classmethod
    def all(cls):

        return cls.forecasts

    @classmethod
    def clear(cls):

        cls.forecasts.clear()