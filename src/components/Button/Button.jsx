
export default function Button ({onBtnSubmit }) {
  
  return (
    <div className="loader">
      <button type="button" className="Button" onClick={onBtnSubmit}>
      Load more
      </button>
    </div>
    
  )
}