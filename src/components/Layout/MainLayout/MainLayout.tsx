import { Props } from '~/types/props.type'
import Sidebar from '../components/Sidebar'

export default function MainLayout(props: Props) {
  const { children } = props
  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
