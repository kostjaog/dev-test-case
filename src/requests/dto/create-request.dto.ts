import { ApiProperty } from "@nestjs/swagger";

export class CreateRequestDto {
    @ApiProperty()
    readonly message: string;
}
