import React, { useState } from "react";
import { Button, Card, Popover } from "antd";
import { TradeEntry } from "./trade";
import { AddToLiquidity } from "./pool/add";
import { PoolAccounts } from "./pool/view";
import { useWallet } from "../utils/wallet";
import { AccountInfo } from "./accountInfo";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";

export const ExchangeView = (props: {}) => {
  const { connected, wallet } = useWallet();
  const tabStyle: React.CSSProperties = { width: 120 };
  const tabList = [
    {
      key: "trade",
      tab: <div style={tabStyle}>Trade</div>,
      render: () => {
        return <TradeEntry />;
      },
    },
    {
      key: "pool",
      tab: <div style={tabStyle}>Pool</div>,
      render: () => {
        return <AddToLiquidity />;
      },
    },
  ];

  const [activeTab, setActiveTab] = useState(tabList[0].key);

  const TopBar = (
    <div className="App-Bar">
      <div className="App-Bar-left">
        MilkySwap - BETA!!!!!!!!
      </div>
      <div className="App-Bar-right">
         <a href="https://twitter.com/tiddyjuicecoin" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img style={{height: 32}} src="data:image/png;base64,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"/>
         </a>
         <a href="https://github.com/21e8/milkyswap" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img style={{height: 32}} src="https://www.sferalabs.cc/wp-content/uploads/github-logo-white-700x465.png"/>
         </a>
        <AccountInfo />
        {connected && (
          <Popover
            placement="bottomRight"
            content={<PoolAccounts />}
            trigger="click"
          >
            <Button type="text">My Pools</Button>
          </Popover>
        )}
        <div>
          {!connected && (
            <Button
              type="text"
              size="large"
              onClick={connected ? wallet.disconnect : wallet.connect}
              style={{ color: "#2abdd2" }}
            >
              Connect
            </Button>
          )}
          {connected && (
            <Popover
              placement="bottomRight"
              title="Wallet public key"
              trigger="click"
            ></Popover>
          )}
        </div>
        {
          <Popover
            placement="topRight"
            title="Settings"
            content={<Settings />}
            trigger="click"
          >
            <Button
              shape="circle"
              size="large"
              type="text"
              icon={<SettingOutlined />}
            />
          </Popover>
        }
      </div>
    </div>
  );

  return (
    <>
      {TopBar}
      <Card
        className="exchange-card"
        headStyle={{ padding: 0 }}
        tabList={tabList}
        tabProps={{
          tabBarGutter: 0,
        }}
        activeTabKey={activeTab}
        onTabChange={(key) => {
          setActiveTab(key);
        }}
      >
        {tabList.find((t) => t.key === activeTab)?.render()}
      </Card>
    </>
  );
};
