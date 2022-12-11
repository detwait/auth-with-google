import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";

export function mapUserEntityToDto({ id, name, email }: UserEntity): UserDto {
  return {
    id,
    name,
    email,
  };
}