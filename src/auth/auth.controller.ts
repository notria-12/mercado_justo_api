import { Controller, Request, Post, UseGuards, Body, Param, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local';
import { AuthService } from 'src/auth/auth.service';
import { Public, ApiResSchema, ApiController } from 'src/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ValidateTokenDto, LoginGoogleDto } from './dto'
import { CreateLogin, LoginResponse } from './entities';
import { RecoverPasswordDto, NewPasswordDto } from 'src/mail/dto';
import { LoginPhoneDto } from './dto/login-phone.dto';
import { SendEmailTokenDto } from 'src/mail/dto/send-email-token.dto';
import { ReceiveTokenDto } from 'src/mail/dto/receive-token.dto';
import { SendSmsTokenDto } from 'src/mail/dto/send-sms-token.dto';

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

  @ApiCreatedResponse(ApiResSchema.apply(LoginResponse)) 
  @Public()
  @Post('login-phone')
  async loginPhone(@Body() loginPhone: LoginPhoneDto) {
     return this.authService.loginPhone(loginPhone);
    
  }

  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Post('codigo-login')
  async loginEmailToken(@Body() email: SendEmailTokenDto) {
     return this.authService.sendEmailToken(email);  
  }

  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Get('verifica-numero/:phone')
  async verifyPhoneNumber(@Param('phone') telefone: string) {
     return this.authService.verifyPhoneNumber(telefone);  
  }

  @ApiCreatedResponse(ApiResSchema.applyType('object'))
  @Public()
  @Post('login-email')
  confirmEmailToken(
    @Body() receiveToken: ReceiveTokenDto,
  ) {
    return this.authService.confirmEmailToken(receiveToken);
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