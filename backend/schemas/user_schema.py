from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "analyst"


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: str | None = None
    email: EmailStr | None = None
    role: str | None = None


class UserResponse(UserBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )