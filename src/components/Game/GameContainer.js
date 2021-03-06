import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { actions as gameActions } from '../../redux/game';
import { actions as uiActions } from '../../redux/ui';
import * as gameSelectors from '../../redux/game-selectors';
// import * as uiSelectors from '../../redux/ui-selectors';

import GameAsDropTarget from './GameAsDropTarget';

const mapStateToProps = state => ({
  rows: gameSelectors.rowsSelector(state),
  cols: gameSelectors.colsSelector(state),
  isInitialized: gameSelectors.isInitializedSelector(state),
  currentPlayerIndex: gameSelectors.currentPlayerIndexSelector(state),
  winner: gameSelectors.winnerSelector(state),
  isGameComplete: gameSelectors.isGameCompleteSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      initializeBoard: gameActions.initializeBoard,
      initializeUi: uiActions.initializeUi,
      clearHoveredColumns: uiActions.clearHoveredColumns,
    },
    dispatch
  ),
});

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(GameAsDropTarget);
