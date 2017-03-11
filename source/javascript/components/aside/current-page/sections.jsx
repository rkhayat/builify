import React from 'react';
import Random from '../../../common/random';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Sortable from '../../shared/sortable';
import CurrentPageItem from './item';
import {
  map as _map,
  values as _values
} from 'lodash';

function renderCurrentPageItems (items, onRemove) {
  return _map(items, (item) => {
    return (
      <CurrentPageItem
        onRemove={() => {
          return onRemove(item);
        }}
        data={item}
        key={Random.randomKey('current-page-item')} />
    );
  });
}

function renderPageDivider (notSortableItems) {
  return notSortableItems.length > 0 ? <div className={classNames('currentPage__divider')} /> : null;
}

export default function Sections ({
  page,
  onRemove,
  onSortBlocks
}) {
  const { navigation, main, footer } = page;
  const sortableOptions = {
    draggable: '.draggable',
    animation: 150,
    filter: '.ignore',
    handle: '.handle',
    onSort: (evt) => {
      return onSortBlocks(evt);
    }
  };
  let items = [];
  let notSortableItems = [];

  _map(main, (mainItem) => {
    items.push(mainItem);
  });

  if (_values(navigation).length !== 0) {
    notSortableItems.unshift(navigation);
  }

  if (_values(footer).length !== 0) {
    notSortableItems.push(footer);
  }

  if (_values(navigation).length === 0 && _values(footer).length === 0 && main.length === 0) {
    return <span className='tip'>{ localization('your page is empty') }</span>;
  } else {
    return (
      <div>
        <ul>
          { renderCurrentPageItems(notSortableItems, onRemove) }
        </ul>
        { renderPageDivider(notSortableItems) }
        <Sortable
          sortable={sortableOptions}
          component='ul'
          childElement='div'
          className={classNames('currentPage')}>
          { renderCurrentPageItems(items, onRemove) }
        </Sortable>
        { renderPageDivider(items) }
      </div>
    );
  }
}

Sections.propTypes = {
  page: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onSortBlocks: React.PropTypes.func.isRequired
};