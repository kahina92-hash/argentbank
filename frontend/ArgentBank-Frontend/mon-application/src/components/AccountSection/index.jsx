import { accountsData } from "../../data/mockData"
import Account from "../Account"

function AccountSection() {
  return (
    <>
      {accountsData.map((account, index) => (
        <Account
          key={`${index}-account`}
          title={account.title}
          amount={account.amount}
          amountDescription={account.amountDescription}
        />
      ))}
    </>
  )
}

export default AccountSection
