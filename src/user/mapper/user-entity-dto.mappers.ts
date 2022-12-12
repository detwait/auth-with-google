
import { format } from "date-fns";
import { DATE_FORMAT } from "../../shared/constant/date-format.constant";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";

export function mapUserEntityToDto({ id, name, email, birthdayDate }: UserEntity): UserDto {
  return {
    id,
    name,
    email,
    birthDay: format(birthdayDate, DATE_FORMAT)
  };
}