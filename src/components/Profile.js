import React, {Component} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import { createUser, updateUser } from '../graphql/mutations'
import { Button, Grid, SwitchField, TextField, SelectField, Radio, RadioGroupField } from "@aws-amplify/ui-react";

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        id: props.id,
        email: props.email,
        nickname: '',
        trainingEnvironment: 0,
        sex: 'male',
        isCoach: false,
        isPlayer: false,
        selfIntroduction: '',
      },
      isRegistered: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSwitchFieldChange = this.handleSwitchFieldChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  handleChange(event) {
    const userState = Object.assign({}, this.state.user);
    userState[event.target.name] = event.target.value;
    this.setState({ user: userState });
  }

  handleSwitchFieldChange(event) {
    const userState = Object.assign({}, this.state.user);
    userState[event.target.name] = event.target.checked;
    this.setState({ user: userState });
  }

  async addUser() {
    // validation
    if (!this.state.user.nickname) {
      alert('ニックネームは必須です。');
      return;
    } else if (!this.state.user.trainingEnvironment) {
      alert('練習拠点を選択してください');
      return;
    }
    // バリデーションが大丈夫だった場合の通信処理
    try {
      await API.graphql(graphqlOperation(createUser, {input: this.state.user}))
    } catch (err) {
      console.log('error createUser:', err)
    }
  }

  async updateUserInfo() {
    // validation
    if (!this.state.user.nickname) {
      alert('ニックネームは必須です。');
      return;
    } else if (!this.state.user.trainingEnvironment) {
      alert('練習拠点を選択してください');
      return;
    }
    // バリデーションが大丈夫だった場合の通信処理
    try {
      await API.graphql(graphqlOperation(updateUser, {input: this.state.user}))
    } catch (err) {
      console.log('error updateUser:', err)
    }
  }

  async getUserInfo(id) {
    const user = await API.graphql(
      graphqlOperation(getUser, { id: id })
    );
    if (!user) {
      this.setState({ isRegistered: false });
      return;
    }
    // 参考：stateの入れ子の中身を更新したい時
    // https://qiita.com/johnslith/items/c1958190bda1461818f6
    const userState = Object.assign({}, this.state.user);
    userState.nickname = user.data.getUser.nickname;
    userState.trainingEnvironment = user.data.getUser.trainingEnvironment;
    userState.sex = user.data.getUser.sex;
    userState.isCoach = user.data.getUser.isCoach;
    userState.isPlayer = user.data.getUser.isPlayer;
    userState.selfIntroduction = user.data.getUser.selfIntroduction;
    this.setState({ user: userState });
    this.setState({ isRegistered: true });
  }

  componentDidMount() {
    this.getUserInfo(this.props.id);
  }

  render() {
    return (
      <div>
        <Grid as="form" rowGap="15px" columnGap="15px" padding="20px">
          <input
            name="userId"
            type="hidden"
            readOnly="readonly"
            value={this.state.user.id}
          />
          <input
            name="email"
            type="hidden"
            readOnly="readonly"
            value={this.state.user.email}
          />
          <TextField
            label="ニックネーム"
            name="nickname"
            onChange={this.handleChange}
            value={this.state.user.nickname}
            placeholder="ニックネーム"
          ></TextField>
          <SelectField
            label="練習拠点"
            name="trainingEnvironment"
            onChange={this.handleChange}
            value={this.state.user.trainingEnvironment}
          >
            <option value="0"></option>
            <option value="1">北海道</option>
            <option value="2">青森県</option>
            <option value="3">岩手県</option>
            <option value="4">宮城県</option>
            <option value="5">秋田県</option>
            <option value="6">山形県</option>
            <option value="7">福島県</option>
            <option value="8">茨城県</option>
            <option value="9">栃木県</option>
            <option value="10">群馬県</option>
            <option value="11">埼玉県</option>
            <option value="12">千葉県</option>
            <option value="13">東京都</option>
            <option value="14">神奈川県</option>
            <option value="15">新潟県</option>
            <option value="16">富山県</option>
            <option value="17">石川県</option>
            <option value="18">福井県</option>
            <option value="19">山梨県</option>
            <option value="20">長野県</option>
            <option value="21">岐阜県</option>
            <option value="22">静岡県</option>
            <option value="23">愛知県</option>
            <option value="24">三重県</option>
            <option value="25">滋賀県</option>
            <option value="26">京都府</option>
            <option value="27">大阪府</option>
            <option value="28">兵庫県</option>
            <option value="29">奈良県</option>
            <option value="30">和歌山県</option>
            <option value="31">鳥取県</option>
            <option value="32">島根県</option>
            <option value="33">岡山県</option>
            <option value="34">広島県</option>
            <option value="35">山口県</option>
            <option value="36">徳島県</option>
            <option value="37">香川県</option>
            <option value="38">愛媛県</option>
            <option value="39">高知県</option>
            <option value="40">福岡県</option>
            <option value="41">佐賀県</option>
            <option value="42">長崎県</option>
            <option value="43">熊本県</option>
            <option value="44">大分県</option>
            <option value="45">宮崎県</option>
            <option value="46">鹿児島県</option>
            <option value="47">沖縄県</option>
          </SelectField>
          <RadioGroupField
            label="性別"
            name="sex"
            onChange={this.handleChange}
            value={this.state.user.sex}
          >
            <Radio value="male">男性</Radio>
            <Radio value="female">女性</Radio>
          </RadioGroupField>
          <SwitchField
            label="あなたはコーチですか？"
            name="isCoach"
            onChange={this.handleSwitchFieldChange}
            isChecked={this.state.user.isCoach}
          ></SwitchField>
          <SwitchField
            label="あなたは選手ですか？"
            name="isPlayer"
            onChange={this.handleSwitchFieldChange}
            isChecked={this.state.user.isPlayer}
          ></SwitchField>
          <TextField
            label="自己紹介"
            name="selfIntroduction"
            onChange={this.handleChange}
            value={this.state.user.selfIntroduction}
            placeholder="実績やスタイル、マッチしたい人のイメージ、得意な種目などを記載してください。"
          ></TextField>
          { this.state.isRegistered ?
            <Button variation="primary" onClick={this.updateUserInfo}>更新</Button> :
            <Button variation="primary" onClick={this.addUser}>登録</Button>
          }
        </Grid>
      </div>
    );
  }
}

export default Profile;