class AccountLockEngine:
    """
    Simulates enterprise account lock actions.
    """

    def lock(self, account):

        return {

            "account": account,

            "action": "Lock Account",

            "status": "SUCCESS",

            "message": f"Account '{account}' has been locked."

        }