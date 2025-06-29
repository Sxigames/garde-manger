import { Label } from '@/components/ui/label'
import { login, signup } from './actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4">
      <div>
      <Label htmlFor="email">Email:</Label>
      <Input id="email" name="email" type="email" required />
      </div>
      <div>
      <Label htmlFor="password">Password:</Label>
      <Input id="password" name="password" type="password" required />
      </div>
      <div className="flex gap-4">
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
      </div>
    </form>
  )
}
export const runtime = 'edge';

export const metadata = {
  title: 'Login',
  description: 'garde manger login page',
}