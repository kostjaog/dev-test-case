import { ApiProperty } from "@nestjs/swagger";

export class ResolveRequestDto {
    @ApiProperty()
    readonly comment: string;
}