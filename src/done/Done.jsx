import './Done.css'
import { Store } from '../store/store'
export const Done = () => {
  const store = Store()
  return (
    <div className='Done'>
      <h1>Done</h1>
      <div className="worked-hours">
        <h2>Worked Hours</h2>
        <div className="this-month">This Month: 23</div>
        <div className="this-week">This Week: 23</div>
        <div className="this-day">This Day: 23</div>
      </div>
      <div className="completed-tasks-container">
        <ul>
          <li>reading</li>
          <li>reading</li>
          <li>reading</li>
        </ul>
        <footer>
          <button>Delete All Completed</button>
        </footer>
        <input
         type="text"
          placeholder='Type a completed task and press Enter'
         />
      </div>
    </div>
  )
}