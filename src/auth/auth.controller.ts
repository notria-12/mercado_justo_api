import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local';
import { AuthService } from 'src/auth/auth.service';
import { Public, ApiResSchema, ApiController } from 'src/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ValidateTokenDto, LoginGoogleDto } from './dto'
import { CreateLogin, LoginResponse } from './entities';
import { RecoverPasswordDto, NewPasswordDto } from 'src/mail/dto';
import { LoginPhoneDto } from './dto/login-phone.dto';

@ApiController('Login', [LoginResponse])
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiBody({ type: CreateLogin })
  @ApiCreatedResponse(ApiResSchema.apply(LoginResponse))
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {

    return this.authService.login(req.user);
  }


  @ApiCreatedResponse(ApiResSchema.apply(LoginResponse))
  @Public()
  @Post('login-google')
  async loginGoogle(@Body() loginGoogle: LoginGoogleDto) {
    return this.authService.loginGoogle(loginGoogle)
  }

  // @ApiCreatedResponse(ApiResSchema.apply(LoginResponse))
  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Post('login-phone')
  async loginPhone(@Body() loginPhone: LoginPhoneDto) {
     return this.authService.loginPhone(loginPhone);
    
  }


  @ApiCreatedResponse(ApiResSchema.applyType('boolean'))
  @Post('validar')
  @Public()
  validate(@Body() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateExternal(validateTokenDto.access_token)
  }

  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Post('recuperar-senha/confirmar')
  confirmRecoverPassword(
    @Body() newPassword: NewPasswordDto,
  ) {
    return this.authService.confirmRecoverPassword(newPassword);
  }

  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Post('recuperar-senha')
  sendRecoverPassword(@Body() recoverPassword: RecoverPasswordDto) {
    return this.authService.sendRecoverPassword(recoverPassword);
  }
}