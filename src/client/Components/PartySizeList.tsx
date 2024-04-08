import { PartySize } from "../Pages/ShopBookingPage/PartySize";
import { useMutableState } from "../utils/useMutableState";
import { useEffect } from "react";
type Props = {
  partySize: PartySize;
};

export const PartySizeList = ({ partySize }: Props): JSX.Element => {
  const minNumPeople = partySize.getShop.minNumPeople;
  const maxNumPeople = partySize.getShop.maxNumPeople;
  const [state, setState] = useMutableState({
    countForAdult: minNumPeople,
    countForSenior: 0,
    countForChild: 0,
    countForBaby: 0,
    currentCount: minNumPeople,
    countForMenuGroup: [],
  });
  console.log(partySize);

  let tempArrayForMenu = [];
  partySize.getMenu.forEach(function (value) {
    if (value.isGroupOrder) {
      tempArrayForMenu.push({
        countForAdult: value.minOrderQty,
        countForSenior: 0,
        countForChild: 0,
        countForBaby: 0,
        currentCount: value.minOrderQty,
      });
    } else {
      tempArrayForMenu.push({
        countForAdult: minNumPeople,
        countForSenior: 0,
        countForChild: 0,
        countForBaby: 0,
        currentCount: minNumPeople,
      });
    }
  });
  useEffect(() => {
    setState((draft) => {
      draft["countForMenuGroup"] = tempArrayForMenu;
    });
  }, []);
  function handleIncrementCounter(type: keyof typeof state) {
    const currentCount =
      state.countForAdult +
      state.countForSenior +
      state.countForBaby +
      state.countForChild;
    if (currentCount < maxNumPeople) {
      setState((draft) => {
        draft[type]++;
        draft["currentCount"] =
          state.countForAdult +
          state.countForSenior +
          state.countForBaby +
          state.countForChild +
          1;
      });
    }
  }
  function handleDecrementCounter(type: keyof typeof state) {
    const currentCount =
      state.countForAdult +
      state.countForSenior +
      state.countForBaby +
      state.countForChild;
    if (currentCount > minNumPeople) {
      setState((draft) => {
        draft[type]--;
        draft["currentCount"] =
          state.countForAdult +
          state.countForSenior +
          state.countForBaby +
          state.countForChild -
          1;
      });
    }
  }
  function handleIncrementCounterForMenu(
    type: keyof typeof state,
    index: number
  ) {
    console.log(type, index);
    const currentCount =
      state.countForMenuGroup[index]?.countForAdult +
      state.countForMenuGroup[index]?.countForSenior +
      state.countForMenuGroup[index]?.countForBaby +
      state.countForMenuGroup[index]?.countForChild;
    if (
      partySize.getMenu[index].isGroupOrder
        ? currentCount < partySize.getMenu[index].maxOrderQty
        : currentCount < maxNumPeople
    ) {
      setState((draft) => {
        draft.countForMenuGroup[index][type]++;
        draft.countForMenuGroup[index].currentCount =
          state.countForMenuGroup[index]?.countForAdult +
          state.countForMenuGroup[index]?.countForSenior +
          state.countForMenuGroup[index]?.countForBaby +
          state.countForMenuGroup[index]?.countForChild +
          1;
      });
    }
  }
  function handleDecrementCounterForMenu(
    type: keyof typeof state,
    index: number
  ) {
    console.log(type, index);
    const currentCount =
      state.countForMenuGroup[index]?.countForAdult +
      state.countForMenuGroup[index]?.countForSenior +
      state.countForMenuGroup[index]?.countForBaby +
      state.countForMenuGroup[index]?.countForChild;
    if (
      partySize.getMenu[index].isGroupOrder
        ? currentCount > partySize.getMenu[index].minOrderQty
        : currentCount > minNumPeople
    ) {
      setState((draft) => {
        draft.countForMenuGroup[index][type]--;
        draft.countForMenuGroup[index].currentCount =
          state.countForMenuGroup[index]?.countForAdult +
          state.countForMenuGroup[index]?.countForSenior +
          state.countForMenuGroup[index]?.countForBaby +
          state.countForMenuGroup[index]?.countForChild -
          1;
      });
    }
  }

  return (
    <div style={{ minWidth: "300px", textAlign: "center" }}>
      <div data-testid="Party Size List">
        <h1>Welcome to party</h1>
        <p>Choose your party</p>
      </div>
      {partySize.getMenu.length > 0 ? (
        Object.entries(partySize.getMenu).map(([key, menuItems]) => (
          <div className="item-group" style={{ margin: "10px 0px" }} key={key}>
            <div
              className="item-name"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {menuItems.title}
            </div>
            <div className="item-name" style={{ textAlign: "center" }}>
              {menuItems.description}
            </div>
            <div
              data-testid="Party Size List Adults Counter"
              className="btn-group for-adult"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>Adult</p>
              <button
                disabled={
                  state.countForMenuGroup[key]?.countForAdult == 0 ||
                  (menuItems.isGroupOrder
                    ? state.countForMenuGroup[key]?.currentCount ==
                      menuItems.minOrderQty
                    : state.countForMenuGroup[key]?.currentCount ==
                      minNumPeople)
                }
                data-testid="Counter Subtract Button"
                className="decrement-btn"
                style={{ margin: "10px 10px" }}
                onClick={() =>
                  handleDecrementCounterForMenu("countForAdult", Number(key))
                }
              >
                <span className="material-symbols-outlined">-</span>
              </button>
              <p className="item-amount" style={{ fontWeight: "bold" }}>
                {state.countForMenuGroup[key]?.countForAdult}
              </p>
              <button
                disabled={
                  state.countForMenuGroup[key]?.countForAdult == 10 ||
                  (menuItems.isGroupOrder
                    ? state.countForMenuGroup[key]?.currentCount ==
                      menuItems.maxOrderQty
                    : state.countForMenuGroup[key]?.currentCount ==
                      maxNumPeople)
                }
                data-testid="Counter Add Button"
                className="increment-btn"
                style={{ margin: "10px 10px" }}
                onClick={() =>
                  handleIncrementCounterForMenu("countForAdult", Number(key))
                }
              >
                <span className="material-symbols-outlined">+</span>
              </button>
            </div>
            {partySize.getShop.showSenior ? (
              <div
                data-testid="Party Size List Seniors Counter"
                className="btn-group for senior"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p>Senior</p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForSenior == 0 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.minOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        minNumPeople)
                  }
                  data-testid="Counter Subtract Button"
                  className="decrement-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleDecrementCounterForMenu("countForSenior", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">-</span>
                </button>
                <p className="item-amount" style={{ fontWeight: "bold" }}>
                  {state.countForMenuGroup[key]?.countForSenior}
                </p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForSenior == 10 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.maxOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        maxNumPeople)
                  }
                  data-testid="Counter Add Button"
                  className="increment-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleIncrementCounterForMenu("countForSenior", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">+</span>
                </button>
              </div>
            ) : null}

            {partySize.getShop.showChild ? (
              <div
                data-testid="Party Size List Children Counter"
                className="btn-group for-child"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p>Child</p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForChild == 0 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.minOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        minNumPeople)
                  }
                  data-testid="Counter Subtract Button"
                  className="decrement-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleDecrementCounterForMenu("countForChild", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">-</span>
                </button>
                <p className="item-amount" style={{ fontWeight: "bold" }}>
                  {state.countForMenuGroup[key]?.countForChild}
                </p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForChild == 10 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.maxOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        maxNumPeople)
                  }
                  data-testid="Counter Add Button"
                  className="increment-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleIncrementCounterForMenu("countForChild", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">+</span>
                </button>
              </div>
            ) : null}

            {partySize.getShop.showBaby ? (
              <div
                data-testid="Party Size List Babies Counter"
                className="btn-group for-baby"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p>Baby</p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForBaby == 0 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.minOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        minNumPeople)
                  }
                  data-testid="Counter Subtract Button"
                  className="decrement-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleDecrementCounterForMenu("countForBaby", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">-</span>
                </button>
                <p className="item-amount" style={{ fontWeight: "bold" }}>
                  {state.countForMenuGroup[key]?.countForBaby}
                </p>
                <button
                  disabled={
                    state.countForMenuGroup[key]?.countForBaby == 10 ||
                    (menuItems.isGroupOrder
                      ? state.countForMenuGroup[key]?.currentCount ==
                        menuItems.maxOrderQty
                      : state.countForMenuGroup[key]?.currentCount ==
                        maxNumPeople)
                  }
                  data-testid="Counter Add Button"
                  className="increment-btn"
                  style={{ margin: "10px 10px" }}
                  onClick={() =>
                    handleIncrementCounterForMenu("countForBaby", Number(key))
                  }
                >
                  <span className="material-symbols-outlined">+</span>
                </button>
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <div className="item-group" style={{ margin: "10px 0px" }}>
          <div
            data-testid="Party Size List Adults Counter"
            className="btn-group for-adult"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <p>Adult</p>
            <button
              disabled={
                state.countForAdult == 0 || state.currentCount == minNumPeople
              }
              data-testid="Counter Subtract Button"
              className="decrement-btn"
              style={{ margin: "10px 10px" }}
              onClick={() => handleDecrementCounter("countForAdult")}
            >
              <span className="material-symbols-outlined">-</span>
            </button>
            <p className="item-amount" style={{ fontWeight: "bold" }}>
              {state.countForAdult}
            </p>
            <button
              disabled={
                state.countForAdult == 10 || state.currentCount == maxNumPeople
              }
              data-testid="Counter Add Button"
              className="increment-btn"
              style={{ margin: "10px 10px" }}
              onClick={() => handleIncrementCounter("countForAdult")}
            >
              <span className="material-symbols-outlined">+</span>
            </button>
          </div>
          {partySize.getShop.showSenior ? (
            <div
              data-testid="Party Size List Seniors Counter"
              className="btn-group for senior"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>Senior</p>
              <button
                disabled={
                  state.countForSenior == 0 ||
                  state.currentCount == minNumPeople
                }
                data-testid="Counter Subtract Button"
                className="decrement-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleDecrementCounter("countForSenior")}
              >
                <span className="material-symbols-outlined">-</span>
              </button>
              <p className="item-amount" style={{ fontWeight: "bold" }}>
                {state.countForSenior}
              </p>
              <button
                disabled={
                  state.countForSenior == 10 ||
                  state.currentCount == maxNumPeople
                }
                data-testid="Counter Add Button"
                className="increment-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleIncrementCounter("countForSenior")}
              >
                <span className="material-symbols-outlined">+</span>
              </button>
            </div>
          ) : null}

          {partySize.getShop.showChild ? (
            <div
              data-testid="Party Size List Children Counter"
              className="btn-group for-child"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>Child</p>
              <button
                disabled={
                  state.countForChild == 0 || state.currentCount == minNumPeople
                }
                data-testid="Counter Subtract Button"
                className="decrement-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleDecrementCounter("countForChild")}
              >
                <span className="material-symbols-outlined">-</span>
              </button>
              <p className="item-amount" style={{ fontWeight: "bold" }}>
                {state.countForChild}
              </p>
              <button
                disabled={
                  state.countForChild == 10 ||
                  state.currentCount == maxNumPeople
                }
                data-testid="Counter Add Button"
                className="increment-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleIncrementCounter("countForChild")}
              >
                <span className="material-symbols-outlined">+</span>
              </button>
            </div>
          ) : null}

          {partySize.getShop.showBaby ? (
            <div
              data-testid="Party Size List Babies Counter"
              className="btn-group for-baby"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <p>Baby</p>
              <button
                disabled={
                  state.countForBaby == 0 || state.currentCount == minNumPeople
                }
                data-testid="Counter Subtract Button"
                className="decrement-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleDecrementCounter("countForBaby")}
              >
                <span className="material-symbols-outlined">-</span>
              </button>
              <p className="item-amount" style={{ fontWeight: "bold" }}>
                {state.countForBaby}
              </p>
              <button
                disabled={
                  state.countForBaby == 10 || state.currentCount == maxNumPeople
                }
                data-testid="Counter Add Button"
                className="increment-btn"
                style={{ margin: "10px 10px" }}
                onClick={() => handleIncrementCounter("countForBaby")}
              >
                <span className="material-symbols-outlined">+</span>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
