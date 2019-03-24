import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProposalTrello, ProposalLabel, Proposal } from './proposal';

class ProposalListItem extends Proposal {
  releasing = false;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showProposalModal = false;                        // 顯示提案企劃視窗
  editProposal = false;                             // false: 新增, true: 修改
  showProposalHistoryModal = false;                 // 顯示提案歷史發布視窗
  form: FormGroup;                                  // 提案企劃表單
  keyword = '';                                     // 搜尋提案企劃關鍵字
  proposalList: ProposalListItem[] = []             // 搜尋提案所有列表
  filtedProposalList: ProposalListItem[] = []       // 搜尋提案篩選後列表
  labelList: ProposalLabel[] = [];                  // 標籤列表
  filtedLabelList: string[] = [];                   // 篩選後標籤列表
  cols: any[] = [];                                 // 搜尋提案列表欄位
  historyCols: any[] = [];                          // 提案歷史發布列表欄位
  historyList: ProposalLabel[] = [];                // 提案歷史發布列表

  constructor(
    private service: AppService
  ) { }

  ngOnInit() {
    this.initCols();
    this.fetchList();
    this.initForm();
    this.fetchLabels();
  }

  /**
   * 初始化表格欄位
   */
  initCols(): void {
    this.cols = [
      { field: 'trello_id', header: '看板代碼', width: 4 },
      { field: 'trello_name', header: '看板名稱', width: 5 },
      { field: 'customer', header: '廠商', width: 4 },
      { field: 'release_date', header: '發布日期', width: 8 },
      { field: 'version', header: '版本', width: 4 },
      { field: 'labels', header: '標籤', width: 10 },
      { field: 'actions', header: '操作', width: 12 }
    ];

    this.historyCols = [
      { field: 'version', header: '版本', width: 3 },
      { field: 'release_date', header: '發布日期', width: 8 },
      { field: 'path', header: '連結', width: 16 }
    ];
  }

  /**
   * 取得所有提案企劃
   */
  fetchList(): void {
    this.service.query().subscribe(res => {
      this.proposalList = res;
      this.filterProposal('');
    });
  }

  /**
   * 取得所有標籤
   */
  fetchLabels(): void {
    this.service.fetchLabelList().subscribe(res => {
      this.labelList = res;
    });
  }

  /**
   * 初始化表單
   */
  initForm(): void {
    this.form = new FormGroup({
      'trello_id': new FormControl('', [Validators.required]),
      'trello_name': new FormControl('', [Validators.required]),
      'customer': new FormControl('', []),
      'labels': new FormControl([], []),
    });
  }

  get trello_id() { return this.form.get('trello_id'); }
  get trello_name() { return this.form.get('trello_name'); }
  get customer() { return this.form.get('customer'); }
  get labels() { return this.form.get('labels'); }

  /**
   * 點擊新增提案企劃
   */
  onNewProposalClick(): void {
    this.trello_id.setValue('');
    this.trello_name.setValue('');
    this.customer.setValue('');
    this.labels.setValue([]);
    this.showProposalModal = true;
    this.editProposal = false;
  }

  /**
   * 篩選標籤
   */
  filterLabels(event): void {
    const keyword = event.query.toUpperCase();
    const filtedList = this.labelList.filter(item => item.name.toUpperCase().indexOf(keyword) > -1);
    if (filtedList) {
      this.filtedLabelList = filtedList.map(item => item.name);
    } else {
      this.filtedLabelList = [];
    }
  }

  /**
   * 儲存目前修改或新增的提案企劃
   */
  onSaveProposalClick(): void {
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const value = this.form.value;
    const req = new ProposalTrello();
    req.trello_id = value.trello_id;
    req.trello_name = value.trello_name;
    req.customer = value.customer;
    req.labels = [];

    value.labels.forEach(item => {
      const foundLabel = this.labelList.find(label => label.name === item);
      const label = new ProposalLabel();
      if (foundLabel) {
        label.id = foundLabel.id;
        label.name = foundLabel.name;
      } else {
        label.id = 0;
        label.name = item;
      }
      req.labels.push(label);
    });

    if (!this.editProposal) {
      this.service.addProposal(req).subscribe(res => {
        this.fetchList();
        this.showProposalModal = false;
      });
    } else {
      this.service.updateProposal(req).subscribe(res => {
        this.fetchList();
        this.showProposalModal = false;
      });
    }
  }

  /**
   * 發布
   */
  onReleaseClick(proposal: ProposalListItem): void {
    proposal.releasing = true;
    this.service.release(proposal.trello_id).subscribe(res => {
      proposal.releasing = false;
      this.fetchList();
    });
  }

  /**
   * 查詢歷史發布
   */
  onQueryHistoryClick(proposal: Proposal): void {
    this.showProposalHistoryModal = true;
    this.service.queryHistory(proposal.trello_id).subscribe(res => {
      this.historyList = res;
    });
  }

  /**
   * 編輯提案企劃
   */
  onEditProposalClick(proposal: Proposal): void {
    this.trello_id.setValue(proposal.trello_id);
    this.trello_name.setValue(proposal.trello_name);
    this.customer.setValue(proposal.customer);
    this.labels.setValue(proposal.labels.map(item => item.name));
    this.showProposalModal = true;
    this.editProposal = true;
  }

  /**
   * 關鍵字篩選提案泣宦
   */
  filterProposal(event: string): void {
    this.filtedProposalList = this.proposalList.filter(item =>
      item.trello_id.indexOf(event) > -1 ||
      item.trello_name.indexOf(event) > -1 ||
      item.customer.indexOf(event) > -1 ||
      item.labels.findIndex(label => label.name.indexOf(event) > -1) > -1
    );
  }
}
