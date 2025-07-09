import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, Clock, DollarSign, LogOut, Wallet } from "lucide-react"
import "./Dashboard.css"

export default function Dashboard({onLogout}) {
  const [balance] = useState(8500)
  const [activeTab, setActiveTab] = useState("all")
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const transactions = [
    { id: 16, type: "out", amount: 2000, to: "0xbc1...97qk", date: "Jul 9, 1:00 PM", status: "Completed" },
    { id: 15, type: "in", amount: 4000, from: "0x7b2...89c3", date: "Jul 6, 2:00 PM", status: "Completed" },
    { id: 1, type: "in", amount: 1500, from: "0x8f4...45e4", date: "Jul 3, 10:03 PM", status: "Completed" },
    { id: 2, type: "in", amount: 3000, from: "0x8a3...45e2", date: "Mar 15, 2:30 PM", status: "Completed" },
    { id: 3, type: "out", amount: 500, to: "0x3f5...87c1", date: "Mar 14, 11:45 AM", status: "Completed" },
    { id: 4, type: "in", amount: 1200, from: "0x4e6...78b3", date: "Mar 13, 9:20 AM", status: "Completed" },
    { id: 5, type: "out", amount: 300, to: "0x7c8...12a5", date: "Mar 12, 4:15 PM", status: "Completed" },
    { id: 6, type: "in", amount: 800, from: "0x9d2...34f7", date: "Feb 28, 8:45 AM", status: "Completed" },
    { id: 7, type: "out", amount: 200, to: "0x2b4...67e9", date: "Feb 25, 1:20 PM", status: "Completed" },
    { id: 8, type: "in", amount: 600, from: "0x5c8...91a3", date: "Feb 22, 10:30 AM", status: "Completed" },
    { id: 9, type: "out", amount: 150, to: "0x6f3...28d4", date: "Feb 18, 3:45 PM", status: "Completed" },
    { id: 10, type: "in", amount: 400, from: "0x1e7...56b2", date: "Feb 15, 7:15 AM", status: "Completed" },
    { id: 11, type: "out", amount: 100, to: "0x4a9...83c6", date: "Feb 12, 5:30 PM", status: "Completed" },
    { id: 12, type: "in", amount: 250, from: "0x8b5...47d1", date: "Jan 30, 12:45 PM", status: "Completed" },
    { id: 13, type: "out", amount: 75, to: "0x3d8...92e5", date: "Jan 25, 9:10 AM", status: "Completed" },
    { id: 14, type: "in", amount: 175, from: "0x5e4...73b9", date: "Jan 20, 2:50 PM", status: "Completed" }
  ]

  const filteredTransactions =
    activeTab === "all"
      ? transactions
 
      : transactions.filter(
          (tx) => (activeTab === "sent" && tx.type === "out") || (activeTab === "received" && tx.type === "in"),
        )

        const handleLogout = () => {
            showToast('Logging out...', 'success');
            setTimeout(() => {
              onLogout();
            }, 1500);
          };

           const showToast = (message, type) => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

        

  return (
    <div className="dashboard-container">
      <div className="animated-bg"></div>
      <div className="dashboard-header">
        <h1>CHAIN WALLET</h1>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </button>
      </div>

      <div className="dashboard-content">
        <div className="card balance-card">
          <div className="card-header">
            <div className="card-description">Total Balance</div>
            <div className="card-title balance-amount">
              <DollarSign className="dollar-sign" />
              {balance.toLocaleString()}
            </div>
          </div>
          <div className="card-content">
            <div className="wallet-address">
              <Wallet className="mr-2 h-4 w-4" />
              <span>bc1qqj4cnknl6t7m8nxmxa9fqjx4th266t42gr72dm</span>
            </div>
          </div>
          <div className="card-footer action-buttons">
            <button className="custom-button send-button">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Send
            </button>
            <button className="custom-button receive-button">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Receive
            </button>
          </div>
        </div>

        <div className="card transactions-card">
          <div className="card-header">
            <div className="card-title">Transaction History</div>
            <div className="card-description"> recent transactions</div>
          </div>
          <div className="card-content">
            <div className="custom-tabs">
              <div className="tabs-list">
                <button
                  className={`tab-trigger ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
               
                <button
                  className={`tab-trigger ${activeTab === "sent" ? "active" : ""}`}
                  onClick={() => setActiveTab("sent")}
                >
                  Sent
                </button>
                <button
                  className={`tab-trigger ${activeTab === "received" ? "active" : ""}`}
                  onClick={() => setActiveTab("received")}
                >
                  Received
                </button>
             
              </div>
              <div className="transaction-list">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={`transaction-item ${tx.type === "in" ? "transaction-in" : "transaction-out"} `}
                  >
                    <div className="transaction-icon">
                      {tx.type === "in" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">{tx.type === "in" ? "Received" : "Sent"}</div>
                      <div className="transaction-subtitle">
                        {tx.type === "in" ? `From: ${tx.from}` : `To: ${tx.to}`}
                      </div>
                    </div>
                    <div className="transaction-meta">
                      <div className={`transaction-amount ${tx.type === "in" ? "amount-in" : "amount-out"} `}>
                        {tx.type === "in" ? "+" : "-"}${tx.amount.toLocaleString()}
                      </div>
                      <div className="transaction-date">
                        <Clock className="h-3 w-3 mr-1" />
                        {tx.date}
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && (
  <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
    <span>{toast.message}</span>
  </div>
)}
    </div>
  )
}