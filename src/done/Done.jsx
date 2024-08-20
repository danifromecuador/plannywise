import './Done.css'
import { Store } from '../store/store'
export const Done = () => {
  const store = Store()
  return (
    <div className='Done'>
      <h1>Done</h1>
      <div className="worked-hours sub-container">
        <h2>Worked Hours</h2>
        <div className="this">
          <div className="this-month"><span className='counter-stats'>12</span><span>This Month</span></div>
          <div className="this-week"><span className='counter-stats'>23</span><span>This Week</span></div>
          <div className="this-day"><span className='counter-stats'>2.25</span><span>This Day</span></div>
        </div>
      </div>
      <div className="completed-tasks sub-container">
        <h2>Completed Tasks</h2>
        <ul className='ul'>
          <li className='li dones'>eat</li>
          <li className='li dones'>code</li>
          <li className='li dones'>sleep</li>
          <li className='li dones'>repeat</li>
        </ul>
        <footer>
          <button className='midBtn'>Delete All Completed</button>
          <input
            type="text"
            className='input'
            placeholder='Type a completed task and press Enter'
          />
        </footer>
      </div>
    </div>
  )
}