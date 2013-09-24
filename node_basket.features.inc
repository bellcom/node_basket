<?php
/**
 * @file
 * node_basket.features.inc
 */

/**
 * Implements hook_node_info().
 */
function node_basket_node_info() {
  $items = array(
    'node_basket' => array(
      'name' => t('Basket'),
      'base' => 'node_content',
      'description' => t('Holds referenced nodes'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
