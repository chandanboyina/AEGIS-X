from agents.ueba.behavior_database import BehaviorDatabase

db = BehaviorDatabase()

db.update_user(

    "hp",

    {

        "login_count": 5,

        "powershell_count": 10

    }

)

print(

    db.get_user("hp")

)