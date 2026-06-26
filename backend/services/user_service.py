from sqlalchemy.orm import Session

from models.user import User
from schemas.user_schema import UserCreate
from schemas.user_schema import UserUpdate


class UserService:

    @staticmethod
    def create_user(db: Session, user: UserCreate):

        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=user.password,
            role=user.role,
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return db_user

    @staticmethod
    def get_all_users(db: Session):

        return db.query(User).all()

    @staticmethod
    def get_user(db: Session, user_id: int):

        return db.query(User).filter(
            User.id == user_id
        ).first()

    @staticmethod
    def update_user(
        db: Session,
        user_id: int,
        user_data: UserUpdate,
    ):

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if not user:
            return None

        update_data = user_data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def delete_user(
        db: Session,
        user_id: int,
    ):

        user = db.query(User).filter(
            User.id == user_id
        ).first()

        if not user:
            return None

        db.delete(user)
        db.commit()

        return user