import { UserDto } from "../../../src/user/dto/user.dto";

export type FakeUser = Omit<UserDto, "id">;